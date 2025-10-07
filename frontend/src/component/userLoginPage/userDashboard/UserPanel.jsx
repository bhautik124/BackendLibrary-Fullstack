import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import CopyToast from "../../docDetails/copyCodeToast/CopyToast";
import PaymentService from "../../payment/PaymentService";
import PaymentModal from "../../payment/PaymentModal";

const API_URL = "https://backendlibraryy-fullstack-backend.onrender.com/api/get-login-user-data";
const LOGOUT_URL = "https://backendlibraryy-fullstack-backend.onrender.com/api/user/auth/logout";
const PAYMENT_STATUS_URL = "https://backendlibraryy-fullstack-backend.onrender.com/api/payment/status";

const UserPanel = () => {
  const [user, setUser] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const maskSensitiveData = (data) => {
    if (!data || data.length < 10) return data;
    return `${data.slice(0, 6)}*****${data.slice(-4)}`;
  };

  const APIS_PER_PAGE = 6;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userRes = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
        });
        const userResult = await userRes.json();

        if (userResult?.data) {
          setUser(userResult.data);
        }

        // Fetch payment status
        const paymentRes = await fetch(PAYMENT_STATUS_URL, {
          method: "GET",
          credentials: "include",
        });
        const paymentResult = await paymentRes.json();

        if (paymentResult?.success) {
          setPaymentStatus(paymentResult.paymentStatus);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        navigate("/docs");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const toggleExpansion = () => {
    setExpanded((prev) => !prev);
  };

  const handleSetCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleCopy = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBuyPlan = (planType) => {
    let paymentData;
    
    if (planType === 'dataBackup') {
      paymentData = {
        availableOptions: {
          dataBackupOnly: {
            type: "data_backup",
            amount: 99,
            description: "Lifetime data backup access"
          }
        },
        message: "Get lifetime data backup access",
        reason: "₹99 plan gives you lifetime access to download your data backup anytime."
      };
    } else if (planType === 'fullAccess') {
      paymentData = {
        availableOptions: {
          fullAccess: {
            type: "full_access", 
            amount: 199,
            description: "Reset API limit + Data backup access"
          }
        },
        message: "Reset your API limit and get data backup access",
        reason: "₹199 plan resets your API limit to 10 and includes data backup access."
      };
    }
    
    setSelectedPlan(paymentData);
    setShowBuyModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowBuyModal(false);
    // Refresh data after payment
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        No user data available
      </div>
    );
  }

  const totalPages = Math.ceil(user.apis.length / APIS_PER_PAGE);
  const startIndex = (currentPage - 1) * APIS_PER_PAGE;
  const endIndex = startIndex + APIS_PER_PAGE;
  const paginatedApis = user.apis.slice(startIndex, endIndex);

  return (
    <div className="p-4 sm:p-6 font-mono">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-300 text-center sm:text-left">
          User Profile
        </h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="w-full sm:w-auto border border-blue-600 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Payment Details
          </button>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto border border-stone-700 bg-stone-700 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* User Card */}
      <div className="grid gap-6 grid-cols-1">
        <div className="bg-stone-950 text-zinc-300 rounded-2xl p-4 sm:p-5 border border-stone-700">
          {/* User Info */}
          <h2 className="text-lg sm:text-xl font-bold">
            Name: {user.userName}
          </h2>
          <p className="text-sm sm:text-base break-all">Email: {user.email}</p>
          
          {/* Payment Status */}
          {paymentStatus && (
            <div className="mt-3 p-3 border border-stone-600 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div>
                  <p className="text-sm">
                    <span className="font-bold">API Usage:</span> {paymentStatus.apiUsageCount}/{paymentStatus.freeApiLimit}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Remaining APIs:</span> {paymentStatus.remainingFreeApis}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm px-2 py-1 rounded ${
                    paymentStatus.isPayment 
                      ? 'bg-green-600 text-white' 
                      : paymentStatus.dataBackupAccess 
                        ? 'bg-blue-600 text-white'
                        : 'bg-red-600 text-white'
                  }`}>
                    {paymentStatus.isPayment 
                      ? 'Full Access' 
                      : paymentStatus.dataBackupAccess 
                        ? 'Backup Only'
                        : 'Free Plan'
                    }
                  </p>
                  {paymentStatus.dataBackupLifetime && (
                    <p className="text-xs text-green-400 mt-1">Lifetime Backup</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Show APIs Button */}
          <button
            onClick={toggleExpansion}
            className="mt-3 border border-stone-600 px-3 py-1 rounded hover:bg-stone-800 transition text-white w-full sm:w-auto"
          >
            {expanded ? "Hide APIs" : "Show APIs"}
          </button>

          {/* APIs List */}
          {expanded && (
            <div className="mt-4 overflow-x-auto">
              {paginatedApis.length > 0 ? (
                paginatedApis.map((api) => (
                  <div
                    key={api._id}
                    className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-stone-700 py-3"
                  >
                    <div className="text-sm break-all">
                      <p className="font-bold text-lg">{api.feature}</p>
                      <p className="mt-2 flex items-center gap-2">
                        <span>{api.url}</span>
                      </p>
                      <p className="text-sm mt-2 flex items-center gap-2">
                        <span className="font-bold">API Key:</span> {api.apiKey}
                      </p>
                      {api.token && (
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm">
                            <span className="font-bold">Token : </span>
                            {maskSensitiveData(api.token)}
                          </span>
                          <FaCopy
                            className="cursor-pointer hover:text-zinc-300"
                            onClick={() => handleCopy(api.token)}
                          />
                        </div>
                      )}
                    </div>
                    <button
                      className={`mt-3 sm:mt-0 px-3 py-1 rounded-lg text-sm w-full sm:w-auto ${
                        api.isActive
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {api.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mt-2 text-sm">No APIs available</p>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center mt-3 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSetCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md border text-sm ${
                        currentPage === i + 1
                          ? "border border-stone-700 bg-stone-700 text-white"
                          : "bg-black border border-stone-700 hover:bg-stone-800 text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-stone-950 border border-stone-700 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-zinc-300">Payment Details</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-stone-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            {paymentStatus ? (
              <div className="space-y-4">
                {/* Current Status */}
                <div className="border border-stone-600 rounded-lg p-4">
                  <h4 className="font-bold text-zinc-300 mb-3">Current Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>API Access:</span>
                      <span className={paymentStatus.isPayment ? 'text-green-400' : 'text-red-400'}>
                        {paymentStatus.isPayment ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Backup:</span>
                      <span className={paymentStatus.hasAnyBackupAccess ? 'text-green-400' : 'text-red-400'}>
                        {paymentStatus.hasAnyBackupAccess ? 
                          (paymentStatus.dataBackupLifetime ? 'Lifetime Access' : 'Access Available') 
                          : 'No Access'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>API Usage:</span>
                      <span>{paymentStatus.apiUsageCount}/{paymentStatus.freeApiLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining APIs:</span>
                      <span className={paymentStatus.remainingFreeApis > 0 ? 'text-green-400' : 'text-red-400'}>
                        {paymentStatus.remainingFreeApis}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Available Plans */}
                {paymentStatus.availablePlans && (
                  <div className="border border-stone-600 rounded-lg p-4">
                    <h4 className="font-bold text-zinc-300 mb-3">Available Plans</h4>
                    <div className="space-y-3">
                      {paymentStatus.availablePlans.dataBackupOnly?.available && 
                       !paymentStatus.dataBackupLifetime && 
                       !paymentStatus.isPayment && (
                        <div className="border border-blue-500 rounded p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-bold text-blue-400">₹99 - Data Backup Only</p>
                              <p className="text-xs text-stone-400">Lifetime data backup access</p>
                            </div>
                            <button 
                              onClick={() => handleBuyPlan('dataBackup')}
                              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {paymentStatus.availablePlans.fullAccess?.available && 
                       (!paymentStatus.isPayment || paymentStatus.apiUsageCount >= paymentStatus.freeApiLimit) && (
                        <div className="border border-green-500 rounded p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-bold text-green-400">₹199 - Full Access</p>
                              <p className="text-xs text-stone-400">API reset + Data backup</p>
                            </div>
                            <button 
                              onClick={() => handleBuyPlan('fullAccess')}
                              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Payment History */}
                {paymentStatus.paymentHistory && paymentStatus.paymentHistory.length > 0 && (
                  <div className="border border-stone-600 rounded-lg p-4">
                    <h4 className="font-bold text-zinc-300 mb-3">Recent Payments</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {paymentStatus.paymentHistory.map((payment, index) => (
                        <div key={index} className="flex justify-between text-sm border-b border-stone-700 pb-2">
                          <div>
                            <p className="font-bold">₹{payment.amount}</p>
                            <p className="text-xs text-stone-400">
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs px-2 py-1 rounded ${
                              payment.status === 'success' ? 'bg-green-600' : 
                              payment.status === 'failed' ? 'bg-red-600' : 'bg-yellow-600'
                            }`}>
                              {payment.status}
                            </p>
                            <p className="text-xs text-stone-400 mt-1">
                              {payment.paymentType?.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-stone-400">
                Loading payment details...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Buy Plan Modal */}
      <PaymentModal
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        paymentData={selectedPlan}
        onPaymentSuccess={handlePaymentSuccess}
        title="Purchase Plan"
      />

      <CopyToast show={copied} message="Copied to clipboard!" />
    </div>
  );
};

export default UserPanel;
