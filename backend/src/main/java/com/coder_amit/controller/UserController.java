package com.coder_amit.controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import com.coder_amit.repository.CentreRepository;
import com.coder_amit.model.Centre;
import com.coder_amit.repository.ZoneRepository;
import com.coder_amit.model.Zone;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.coder_amit.model.User;
import com.coder_amit.service.UserService;
import com.coder_amit.service.OtpService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import com.coder_amit.model.Role;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Maine ise "*" kar diya hai taaki frontend se koi connection error na aaye
public class UserController {

    @Autowired
    private JavaMailSender mailSender;

    private final UserService userService;
    private final OtpService otpService;
    private final CentreRepository centreRepository;
    private final ZoneRepository zoneRepository;

    public UserController(UserService userService,
            OtpService otpService,
            CentreRepository centreRepository,
            ZoneRepository zoneRepository) {

        this.userService = userService;
        this.otpService = otpService;
        this.centreRepository = centreRepository;
        this.zoneRepository = zoneRepository;
    }

    // ⭐ Signup API
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {

        if (user.getEmail() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required"));
        }

        if (!otpService.isOtpVerified(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid OTP"));
        }

        if (userService.isEmailExist(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already registered"));
        }

        userService.signup(user);

        return ResponseEntity.ok(
                Map.of("message", "Signup successfully"));
    }

    // ⭐ Login API (Ab ye error nahi dega)

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        Optional<User> result = userService.login(user.getEmail(), user.getPassword());

        if (result.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Username or password not match"));
        }

        User loggedUser = result.get();

        // blocked check
        if (loggedUser.isBlocked()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "User is blocked"));
        }

        return ResponseEntity.ok(
                Map.of(
                        "message", "Login successful",
                        "userId", loggedUser.getId(),
                        "username", loggedUser.getUsername(),
                        "role", loggedUser.getRole()));
    }

    // ⭐ Get all students for admin panel
    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<?> getUsersByRole(@PathVariable Role role) {
        return ResponseEntity.ok(userService.getUsersByRole(role));
    }

    @PutMapping("/block/{id}")
    public ResponseEntity<?> blockStudent(@PathVariable Long id) {

        Optional<User> userOpt = userService.findById(id);

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "User not found"));
        }

        User user = userOpt.get();

        // toggle block status
        user.setBlocked(!user.isBlocked());

        userService.save(user);

        String message = user.isBlocked()
                ? "Student blocked successfully"
                : "Student unblocked successfully";

        return ResponseEntity.ok(
                Map.of("message", message));
    }

    // ⭐ Get user wallet for dashboard
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {

        Optional<User> userOpt = userService.findById(id);

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "User not found"));
        }

        User user = userOpt.get();

        Long zoneId = null;
        String zoneName = null;

        if (user.getZone() != null) {
            zoneId = user.getZone().getId();
            zoneName = user.getZone().getZoneName();
        }

        Long centreId = null;
        String centreName = null;

        if (user.getCentre() != null) {
            centreId = user.getCentre().getId();
            centreName = user.getCentre().getCentreName();
        }
        Map<String, Object> response = new java.util.HashMap<>();

        response.put("id", user.getId());
        response.put("fullname", user.getFullname());
        response.put("mobile", user.getMobile());
        response.put("email", user.getEmail());
        response.put("walletCoins", user.getWalletCoins());
        response.put("referralCode", user.getReferralCode());
        response.put("commission", user.getCommission());
        response.put("zoneId", zoneId);
        response.put("zoneName", zoneName);
        response.put("centreId", centreId);
        response.put("centreName", centreName);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/vendor/register")
    public ResponseEntity<?> registerVendor(@RequestBody Map<String, Object> body) {

        String fullname = (String) body.get("fullname");
        String mobile = (String) body.get("mobile");
        String email = (String) body.get("email");
        String password = (String) body.get("password");

        Double commission = body.get("commission") != null
                ? Double.valueOf(body.get("commission").toString())
                : 0.0;

        Long zoneId = body.get("zoneId") != null
                ? Long.valueOf(body.get("zoneId").toString())
                : null;

        Long centreId = null;

        // centreIds array frontend से आ रहा है
        if (body.get("centreIds") != null) {
            List<?> centres = (List<?>) body.get("centreIds");
            if (!centres.isEmpty()) {
                centreId = Long.valueOf(centres.get(0).toString());
            }
        }

        if (userService.isEmailExist(email)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already registered"));
        }

        User user = new User();

        user.setFullname(fullname);
        user.setMobile(mobile);
        user.setEmail(email);
        user.setUsername(email);
        user.setPassword(password);
        user.setCommission(commission);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRole(Role.VENDOR);

        // zone save
        if (zoneId != null) {
            Zone zone = zoneRepository.findById(zoneId).orElse(null);
            user.setZone(zone);
        }

        // centre save
        if (centreId != null) {
            Centre centre = centreRepository.findById(centreId).orElse(null);
            user.setCentre(centre);
        }

        User saved = userService.save(user);

        return ResponseEntity.ok(Map.of(
                "message", "Vendor created",
                "id", saved.getId()));
    }

    @PutMapping("/vendor/update/{id}")
    public ResponseEntity<?> updateVendor(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {

        Optional<User> userOpt = userService.findById(id);

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Vendor not found"));
        }

        User user = userOpt.get();

        String fullname = (String) body.get("fullname");
        String mobile = (String) body.get("mobile");

        Double commission = body.get("commission") != null
                ? Double.valueOf(body.get("commission").toString())
                : 0.0;

        Long zoneId = body.get("zoneId") != null
                ? Long.valueOf(body.get("zoneId").toString())
                : null;

        Long centreId = null;

        if (body.get("centreIds") != null) {
            List<?> centres = (List<?>) body.get("centreIds");
            if (!centres.isEmpty()) {
                centreId = Long.valueOf(centres.get(0).toString());
            }
        }

        user.setFullname(fullname);
        user.setMobile(mobile);
        user.setCommission(commission);

        if (zoneId != null) {
            Zone zone = zoneRepository.findById(zoneId).orElse(null);
            user.setZone(zone);
        }

        if (centreId != null) {
            Centre centre = centreRepository.findById(centreId).orElse(null);
            user.setCentre(centre);
        }

        userService.save(user);

        return ResponseEntity.ok(Map.of(
                "message", "Vendor updated successfully"));
    }

    @GetMapping("/check-email")
    public Map<String, Boolean> checkEmail(@RequestParam String email) {

        boolean exists = userService.isEmailExist(email);

        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);

        return response;
    }

    @GetMapping("/send-admission-verification")
    public ResponseEntity<?> sendAdmissionVerification(
            @RequestParam String studentEmail,
            @RequestParam String vendorName,
            @RequestParam String zone,
            @RequestParam String centre,
            @RequestParam String section,
            @RequestParam String shift,
            @RequestParam String seat) {

        try {

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(studentEmail);
            message.setSubject("GM Library Admission Verification");

            String link = "http://localhost:5500/student-panel/verify-admission.html"
                    + "?email=" + URLEncoder.encode(studentEmail, StandardCharsets.UTF_8)
                    + "&vendor=" + URLEncoder.encode(vendorName, StandardCharsets.UTF_8)
                    + "&zone=" + URLEncoder.encode(zone, StandardCharsets.UTF_8)
                    + "&centre=" + URLEncoder.encode(centre, StandardCharsets.UTF_8)
                    + "&section=" + URLEncoder.encode(section, StandardCharsets.UTF_8)
                    + "&shift=" + URLEncoder.encode(shift, StandardCharsets.UTF_8)
                    + "&seat=" + URLEncoder.encode(seat, StandardCharsets.UTF_8);

            System.out.println("VERIFY LINK: " + link);

            message.setText(
                    "Hello,\n\n"
                            + "A vendor is trying to take your admission.\n\n"
                            + "Vendor: " + vendorName + "\n"
                            + "Zone: " + zone + "\n"
                            + "Centre: " + centre + "\n"
                            + "Section: " + section + "\n"
                            + "Shift: " + shift + "\n"
                            + "Seat: " + seat + "\n\n"
                            + "Click the link below to ACCEPT admission:\n\n"
                            + link);

            mailSender.send(message);

            return ResponseEntity.ok(Map.of(
                    "message", "Verification email sent"));

        } catch (Exception e) {

            return ResponseEntity.status(500).body(Map.of(
                    "error", "Email sending failed"));

        }
    }
}
