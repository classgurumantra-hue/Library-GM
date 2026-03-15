package com.coder_amit.service;

import com.coder_amit.model.Admission;
import com.coder_amit.repository.AdmissionRepository;
import org.springframework.stereotype.Service;
import com.coder_amit.repository.UserRepository;
import com.coder_amit.repository.CoinHistoryRepository;
import com.coder_amit.model.User;
import com.coder_amit.model.CoinHistory;
import com.coder_amit.repository.CentreRepository;
import com.coder_amit.repository.SectionRepository;
import com.coder_amit.repository.ShiftRepository;
import com.coder_amit.repository.SeatRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import java.util.List;

@Service
public class AdmissionService {
    private final AdmissionRepository admissionRepository;
    private final UserRepository userRepository;
    private final CoinHistoryRepository coinHistoryRepository;
    private final CentreRepository centreRepository;
    private final SectionRepository sectionRepository;
    private final ShiftRepository shiftRepository;
    private final SeatRepository seatRepository;
    private final JavaMailSender mailSender;

    public AdmissionService(
            AdmissionRepository admissionRepository,
            UserRepository userRepository,
            CoinHistoryRepository coinHistoryRepository,
            SectionRepository sectionRepository,
            ShiftRepository shiftRepository,
            SeatRepository seatRepository,
            JavaMailSender mailSender,
            CentreRepository centreRepository) {

        this.admissionRepository = admissionRepository;
        this.userRepository = userRepository;
        this.coinHistoryRepository = coinHistoryRepository;
        this.sectionRepository = sectionRepository;
        this.shiftRepository = shiftRepository;
        this.seatRepository = seatRepository;
        this.mailSender = mailSender;
        this.centreRepository = centreRepository;
    }

    public Admission addAdmission(Admission admission) {

        // 1️⃣ पहले admission save होगा
        Admission savedAdmission = admissionRepository.save(admission);

        // 2️⃣ admission लेने वाला student
        User student = userRepository.findById(savedAdmission.getStudent().getId()).orElse(null);

        // 3️⃣ check referral code use हुआ था या नहीं
        if (student != null && student.getReferredBy() != null && !student.getReferredBy().isEmpty()) {

            userRepository.findByReferralCode(student.getReferredBy())
                    .ifPresent(referrer -> {

                        // 4️⃣ admission fee
                        double fee = centreRepository.findById(savedAdmission.getCentre().getId())
                                .orElseThrow()
                                .getAdmissionFee();

                        // 5️⃣ 30% reward
                        int rewardCoins = (int) (fee * 0.30);

                        // 6️⃣ referrer wallet update
                        referrer.setWalletCoins(referrer.getWalletCoins() + rewardCoins);
                        userRepository.save(referrer);

                        // 7️⃣ coin history entry
                        CoinHistory history = new CoinHistory();
                        history.setUserId(referrer.getId());
                        history.setCoins(rewardCoins);
                        history.setType("REFERRAL_REWARD");

                        coinHistoryRepository.save(history);
                    });
        }

        return savedAdmission;
    }

    public List<Admission> getAdmissionsByCentre(Long centreId) {
        return admissionRepository.findByCentre_Id(centreId);
    }

    public Admission createVendorAdmission(
            Long studentId,
            Long vendorId,
            Long centreId,
            Long sectionId,
            Long shiftId,
            Long seatId,
            String studentName) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        User vendor = userRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        Admission admission = new Admission();

        admission.setStudent(student);
        admission.setVendor(vendor);
        admission.setStudentName(studentName);

        admission.setCentre(
                centreRepository.findById(centreId)
                        .orElseThrow(() -> new RuntimeException("Centre not found")));

        admission.setSection(
                sectionRepository.findById(sectionId)
                        .orElseThrow(() -> new RuntimeException("Section not found")));

        admission.setShift(
                shiftRepository.findById(shiftId)
                        .orElseThrow(() -> new RuntimeException("Shift not found")));

        admission.setSeat(
                seatRepository.findById(seatId)
                        .orElseThrow(() -> new RuntimeException("Seat not found")));

        admission.setAdmissionDate(java.time.LocalDate.now());

        // verification token
        String token = java.util.UUID.randomUUID().toString();
        admission.setVerificationToken(token);

        admission.setStatus("PENDING");

        Admission saved = admissionRepository.save(admission);

        // verification link
        String verificationLink = "http://localhost:8087/api/admissions/verify?token=" + saved.getVerificationToken();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(saved.getStudent().getEmail());
        message.setSubject("GM Library Admission Verification");

        message.setText(
                "Hello " + saved.getStudentName() + ",\n\n" +
                        "Vendor " + saved.getVendor().getFullname() +
                        " is taking admission for you at GM Library.\n\n" +

                        "Centre: " + saved.getCentre().getCentreName() + "\n" +
                        "Section: " + saved.getSection().getName() + "\n" +
                        "Shift: " + saved.getShift().getName() + "\n" +
                        "Seat: " + saved.getSeat().getSeatNumber() + "\n\n" +

                        "Click below to confirm your admission:\n" +
                        verificationLink + "\n\n" +

                        "If you did not request this, ignore this email.");

        // send email
        mailSender.send(message);

        return saved;
    }

    public Admission verifyAdmissionToken(String token) {

        Admission admission = admissionRepository.findByVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid verification token"));

        admission.setStatus("ACCEPTED");

        return admissionRepository.save(admission);
    }
}