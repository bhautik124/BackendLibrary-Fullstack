import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useApiGenerateCheckAuth from "../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import PaymentService from "../../payment/PaymentService";
import PaymentModal from "../../payment/PaymentModal";

const GetBackupOfData = () => {
  const isAuth = useApiGenerateCheckAuth();
  const [backupInfo, setBackupInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  // Fetch backup info on component mount
  useEffect(() => {
    if (isAuth === true) {
      fetchBackupInfo();
    }
  }, [isAuth]);

  const fetchBackupInfo = async () => {
    try {
  const response = await fetch("https://backendlibraryy-fullstack-backend.onrender.com/api/crud-get-backup-info", {
        method: "GET",
        credentials: "include"
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setBackupInfo(result.backupInfo);
        }
      }
    } catch (error) {
      console.error("Error fetching backup info:", error);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    
    try {
      // First check if payment is required
      const paymentCheck = await PaymentService.checkPaymentRequired("data_backup");
      
      if (paymentCheck.requiresPayment) {
        // Show payment modal
        setPaymentData(paymentCheck);
        setShowPaymentModal(true);
        setLoading(false);
        return;
      }

      // If no payment required, proceed with download
      const response = await fetch(
  "https://backendlibraryy-fullstack-backend.onrender.com/api/crud-get-backup",
        { method: "GET", credentials: "include" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.requiresPayment) {
          setPaymentData(errorData);
          setShowPaymentModal(true);
          setLoading(false);
          return;
        }
        throw new Error(errorData.message || "Failed to fetch backup data");
      }

      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = data.metadata ? 
        `backup_${data.metadata.userName}_${Date.now()}.json` : 
        "backup.json";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert("Backup downloaded successfully!");
    } catch (error) {
      console.error("Error downloading backup:", error);
      alert(error.message || "Failed to download backup data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Retry download after payment
    setTimeout(() => {
      handleDownload();
    }, 1000);
  };

  if (isAuth === null)
    return <p className="text-white">Checking authentication...</p>;

  if (isAuth === false) return <Navigate to="/user-login" replace />;

  return (
    <div className="pb-40 px-4 sm:px-6 lg:px-8">
      <h1 className="text-zinc-100 text-2xl sm:text-3xl font-bold mb-4">
        Data Backup
      </h1>

      {/* Backup Info Section */}
      {backupInfo && (
        <div className="bg-stone-900 border border-stone-700 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-bold text-zinc-300 mb-3">Backup Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-bold">Account:</span> {backupInfo.userName}</p>
              <p><span className="font-bold">Email:</span> {backupInfo.email}</p>
              <p><span className="font-bold">Member Since:</span> {new Date(backupInfo.accountCreated).toLocaleDateString()}</p>
            </div>
            <div>
              <p><span className="font-bold">Total APIs:</span> {backupInfo.totalApis}</p>
              <p><span className="font-bold">Models to Backup:</span> {backupInfo.totalModelsToBackup}</p>
              <p className={`font-bold ${backupInfo.paymentStatus ? 'text-green-400' : 'text-red-400'}`}>
                Status: {backupInfo.paymentStatus ? 'Paid User' : 'Free User'}
              </p>
            </div>
          </div>

          {/* Features Used */}
          <div className="mt-4">
            <p className="font-bold text-zinc-300 mb-2">Features Used:</p>
            <div className="flex flex-wrap gap-2">
              {backupInfo.featuresUsed.beginnerAuth && (
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Beginner Auth</span>
              )}
              {backupInfo.featuresUsed.emailOtpAuth && (
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Email OTP</span>
              )}
              {backupInfo.featuresUsed.googleAuth && (
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">Google Auth</span>
              )}
              {backupInfo.featuresUsed.roleBasedAuth && (
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">Role Based</span>
              )}
              {backupInfo.featuresUsed.crudWithoutImage && (
                <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">CRUD</span>
              )}
              {backupInfo.featuresUsed.crudWithImage && (
                <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs">CRUD + Images</span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
        <p className="text-base sm:text-lg">
          To get the backup of your data, Click on the "Download" button.
        </p>
        <button
          onClick={handleDownload}
          disabled={loading}
          className={`text-base sm:text-lg font-bold border rounded-full px-6 py-2 transition w-fit ${
            loading
              ? "border-stone-600 bg-stone-700 text-stone-400 cursor-not-allowed"
              : "border-stone-700 bg-stone-800 hover:bg-stone-700"
          }`}
        >
          {loading ? "Processing..." : "Download Backup"}
        </button>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentData={paymentData}
        onPaymentSuccess={handlePaymentSuccess}
        title="Data Backup - Payment Required"
      />
    </div>
  );
};

export default GetBackupOfData;
