import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const paymentId = searchParams.get("reference");

  const handleCopyId = () => {
    navigator.clipboard.writeText(paymentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '60px 40px',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        animation: 'slideUp 0.5s ease-out'
      }}>
        {/* Success Icon */}
        <div style={{
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          margin: '0 auto 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '50px',
          animation: 'scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}>
          ✓
        </div>

        {/* Title */}
        <h1 style={{
          margin: '0 0 15px 0',
          fontSize: '36px',
          fontWeight: '700',
          color: '#333',
          letterSpacing: '-0.5px'
        }}>
          Payment Successful!
        </h1>

        {/* Subtitle */}
        <p style={{
          margin: '0 0 40px 0',
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.6'
        }}>
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>

        {/* Payment ID Section */}
        <div style={{
          background: '#f8f9fa',
          border: '2px dashed #667eea',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '40px'
        }}>
          <p style={{
            margin: '0 0 10px 0',
            fontSize: '12px',
            color: '#999',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '600'
          }}>
            Transaction ID
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}>
            <code style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#333',
              wordBreak: 'break-all'
            }}>
              {paymentId || 'N/A'}
            </code>
            <button
              onClick={handleCopyId}
              style={{
                background: copied ? '#10b981' : '#667eea',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => !copied && (e.target.style.background = '#764ba2')}
              onMouseOut={(e) => !copied && (e.target.style.background = '#667eea')}
            >
              {copied ? '✓ Copied' : 'Copy ID'}
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div style={{
          background: '#f0f4ff',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '40px',
          textAlign: 'left'
        }}>
          <h3 style={{
            margin: '0 0 15px 0',
            fontSize: '14px',
            fontWeight: '700',
            color: '#333',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            What's Next?
          </h3>
          <ul style={{
            margin: '0',
            paddingLeft: '20px',
            color: '#666',
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            <li>Check your email for order confirmation</li>
            <li>Track your order status in your account</li>
            <li>Estimated delivery: 5-7 business days</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate('/orders')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '14px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            View Orders
          </button>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'white',
              color: '#667eea',
              border: '2px solid #667eea',
              padding: '12px 30px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#f0f4ff';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @media (max-width: 600px) {
          div {
            padding: 30px 20px !important;
          }
          h1 {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default PaymentSuccess
