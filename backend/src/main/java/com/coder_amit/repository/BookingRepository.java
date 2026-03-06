package com.coder_amit.repository;

import com.coder_amit.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findBySeat_SeatNumber(Integer seatNumber);

    List<Booking> findByBookingTimeBefore(LocalDateTime expiryTime);

    List<Booking> findByStudentId(Long studentId);

    List<Booking> findBySeat_Shift_Section_Centre_Zone_Id(Long zoneId);

    List<Booking> findBySeat_Shift_Section_Centre_Id(Long centreId);

    List<Booking> findBySeat_Shift_Section_Id(Long sectionId);

    List<Booking> findBySeat_Shift_Id(Long shiftId);
}