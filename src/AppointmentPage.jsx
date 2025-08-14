import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import LoginModal from './Auth/LoginModal';
import styles from './AppointmentPage.module.css';

const AppointmentPage = () => {
  const { isAuthenticated, user, hasStoredToken, checkAuthStatus } = useAuth();
  
  const [slots] = useState([
    { id: 1, date: '2025-02-25', time: '09:00 AM - 09:30 AM' },
    { id: 2, date: '2025-02-25', time: '10:00 AM - 10:30 AM' },
    { id: 3, date: '2025-02-25', time: '11:00 AM - 11:30 AM' },
    { id: 4, date: '2025-02-25', time: '02:00 PM - 02:30 PM' },
    { id: 5, date: '2025-02-25', time: '03:00 PM - 03:30 PM' }
  ]);
  
  const [myAppointments, setMyAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAlreadyBookedModal, setShowAlreadyBookedModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Fetch user's appointments
  const fetchMyAppointments = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:5000/api/appointments/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMyAppointments(data.appointments);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyAppointments();
    }
  }, [isAuthenticated]);

  // Check if slot is already booked
  const isSlotBooked = (slotId) => {
    return myAppointments.some(appointment => appointment.slotId === slotId);
  };

  // Handle booking
  const handleBook = async (slot) => {
    if (!hasStoredToken()) {
      setShowLoginModal(true);
      return;
    }
    if (!isAuthenticated) {
      await checkAuthStatus();
      if (!isAuthenticated) {
        setShowLoginModal(true);
        return;
      }
    }

    // Check if already booked
    if (isSlotBooked(slot.id)) {
      setSelectedSlot(slot);
      setShowAlreadyBookedModal(true);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const appointmentData = {
        slotId: slot.id,
        date: slot.date,
        time: slot.time
      };

      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });
      const data = await res.json();
      if (data.success) {
        setSelectedSlot(slot);
        setShowSuccessModal(true);
        fetchMyAppointments();
      } else {
        if (data.message.includes('already booked')) {
          setSelectedSlot(slot);
          setShowAlreadyBookedModal(true);
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Network error. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={styles.appointmentPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Book Your Appointment</h1>
        <p className={styles.pageSubtitle}>
          Schedule a consultation with our cybersecurity experts
        </p>
      </div>

      {/* Book Appointment Section */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>📅</div>
          <div>
            <h2 className={styles.sectionTitle}>Available Time Slots</h2>
            <p className={styles.sectionDescription}>
              Choose from available consultation slots
            </p>
          </div>
        </div>

        <div className={styles.slotsContainer}>
          {slots.map(slot => (
            <div 
              key={slot.id} 
              className={`${styles.slotCard} ${isSlotBooked(slot.id) ? styles.bookedSlot : ''}`}
            >
              <div className={styles.slotDate}>
                <span className={styles.dateIcon}>📅</span>
                <strong>{formatDate(slot.date)}</strong>
              </div>
              <div className={styles.slotTime}>
                <span className={styles.timeIcon}>🕐</span>
                {slot.time}
              </div>
              <button 
                className={`${styles.bookButton} ${isSlotBooked(slot.id) ? styles.bookedButton : ''}`}
                onClick={() => handleBook(slot)}
                disabled={isSlotBooked(slot.id)}
              >
                {isSlotBooked(slot.id) ? '✅ Booked' : '📝 Book Now'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* My Appointments Section */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionIcon}>📋</div>
          <div>
            <h2 className={styles.sectionTitle}>My Appointments</h2>
            <p className={styles.sectionDescription}>
              View your scheduled consultations ({myAppointments.length})
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading your appointments...</p>
          </div>
        ) : myAppointments.length > 0 ? (
          <div className={styles.appointmentsGrid}>
            {myAppointments.map(appointment => (
              <div key={appointment._id} className={styles.appointmentCard}>
                <div className={styles.appointmentHeader}>
                  <div className={styles.appointmentStatus}>
                    <span className={styles.statusIcon}>✅</span>
                    <span className={styles.statusText}>Confirmed</span>
                  </div>
                  <div className={styles.appointmentId}>
                    #{appointment._id.slice(-6)}
                  </div>
                </div>
                
                <div className={styles.appointmentDetails}>
                  <div className={styles.appointmentDate}>
                    <span className={styles.detailIcon}>📅</span>
                    <div>
                      <strong>{formatDate(appointment.date)}</strong>
                      <p className={styles.dateSubtext}>Consultation Date</p>
                    </div>
                  </div>
                  
                  <div className={styles.appointmentTime}>
                    <span className={styles.detailIcon}>🕐</span>
                    <div>
                      <strong>{appointment.time}</strong>
                      <p className={styles.timeSubtext}>Duration: 30 minutes</p>
                    </div>
                  </div>
                </div>

                <div className={styles.appointmentFooter}>
                  <div className={styles.expertInfo}>
                    <span className={styles.expertIcon}>👩‍💼</span>
                    <span>Cybersecurity Expert</span>
                  </div>
                  <div className={styles.appointmentActions}>
                    <button className={styles.rescheduleButton}>
                      🔄 Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📅</div>
            <h3 className={styles.emptyTitle}>No Appointments Yet</h3>
            <p className={styles.emptyDescription}>
              Book your first consultation with our cybersecurity experts
            </p>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          fetchMyAppointments();
        }}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.successIcon}>🎉</div>
              <h3 className={styles.modalTitle}>Appointment Booked!</h3>
              <p className={styles.modalMessage}>
                Your appointment has been successfully scheduled for:
              </p>
              {selectedSlot && (
                <div className={styles.appointmentSummary}>
                  <p><strong>Date:</strong> {formatDate(selectedSlot.date)}</p>
                  <p><strong>Time:</strong> {selectedSlot.time}</p>
                </div>
              )}
              <p className={styles.modalNote}>
                You'll receive a confirmation email shortly with meeting details.
              </p>
              <button 
                className={styles.modalButton}
                onClick={() => setShowSuccessModal(false)}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Already Booked Modal */}
      {showAlreadyBookedModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.warningIcon}>⚠️</div>
              <h3 className={styles.modalTitle}>Already Booked</h3>
              <p className={styles.modalMessage}>
                You have already booked this appointment slot:
              </p>
              {selectedSlot && (
                <div className={styles.appointmentSummary}>
                  <p><strong>Date:</strong> {formatDate(selectedSlot.date)}</p>
                  <p><strong>Time:</strong> {selectedSlot.time}</p>
                </div>
              )}
              <p className={styles.modalNote}>
                Please choose a different time slot or reschedule your existing appointment.
              </p>
              <button 
                className={styles.modalButton}
                onClick={() => setShowAlreadyBookedModal(false)}
              >
                Choose Another Time
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
