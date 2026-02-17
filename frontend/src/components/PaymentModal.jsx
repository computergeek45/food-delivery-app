const PaymentModal = ({ method, onClose, onSuccess }) => {
  const simulatePayment = () => {
    setTimeout(() => {
      onSuccess({
        status: "success",
        transactionId: "TXN" + Date.now(),
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-80">
        <h3 className="text-xl font-bold mb-4 text-center">
          {method === "gpay" ? "Google Pay" : "Card Payment"}
        </h3>

        {/* ✅ GPAY UI */}
        {method === "gpay" && (
          <>
            <div className="border rounded-lg p-4 mb-4 text-center">
              <div className="w-32 h-32 mx-auto mb-3 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                QR CODE
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Scan QR using Google Pay
              </p>
            </div>

            <input
              className="input input-bordered w-full mb-4"
              placeholder="Enter UPI ID (e.g. name@okaxis)"
            />
          </>
        )}

        {/* ✅ CARD UI */}
        {method === "card" && (
          <>
            <input
              className="input input-bordered w-full mb-3"
              placeholder="Card Number"
            />
            <input
              className="input input-bordered w-full mb-3"
              placeholder="Expiry Date (MM/YY)"
            />
            <input
              className="input input-bordered w-full mb-4"
              placeholder="CVV"
            />
          </>
        )}

        <button
          onClick={simulatePayment}
          className="btn btn-primary w-full mb-2"
        >
          Pay Now
        </button>

        <button
          onClick={onClose}
          className="btn btn-ghost w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
