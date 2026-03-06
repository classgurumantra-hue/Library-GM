package com.coder_amit.service;

import com.coder_amit.model.Centres;
import com.coder_amit.model.Zone;
import com.coder_amit.repository.CentresRepository;
import com.coder_amit.repository.ZoneRepository;
import org.springframework.stereotype.Service;
import com.coder_amit.repository.SectionRepository;
import com.coder_amit.repository.ShiftRepository;
import com.coder_amit.repository.SeatRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CentresService {
    private final CentresRepository centresRepository;
    private final ZoneRepository zoneRepository;
    private final SectionRepository sectionRepository;
    private final ShiftRepository shiftRepository;
    private final SeatRepository seatRepository;

    public CentresService(
            CentresRepository centresRepository,
            ZoneRepository zoneRepository,
            SectionRepository sectionRepository,
            ShiftRepository shiftRepository,
            SeatRepository seatRepository) {

        this.centresRepository = centresRepository;
        this.zoneRepository = zoneRepository;
        this.sectionRepository = sectionRepository;
        this.shiftRepository = shiftRepository;
        this.seatRepository = seatRepository;
    }

    public Centres createCentres(Centres centres, Long zoneId) {
        Zone zone = zoneRepository.findById(zoneId).orElseThrow(() -> new RuntimeException("Zone is not found"));
        centres.setZone(zone);
        return centresRepository.save(centres);
    }

    public List<Centres> getAllCentres() {

        return centresRepository.findAll()
                .stream()
                .filter(c -> c.getZone() != null && Boolean.FALSE.equals(c.getZone().getDeleted()))
                .toList();
    }

    public Centres getCentresById(Long id) {
        return centresRepository.findById(id).orElseThrow(() -> new RuntimeException("centres not found"));
    }

    public Centres updateCentres(Long id, Centres centresDetails, Long zoneId) {
        Centres centres = getCentresById(id);
        Zone zone = zoneRepository.findById(zoneId).orElseThrow(() -> new RuntimeException("Zone not found"));
        centres.setCentreName(centresDetails.getCentreName());
        centres.setCapacity(centresDetails.getCapacity());
        centres.setAdmissionFee(centresDetails.getAdmissionFee());
        centres.setDescription(centresDetails.getDescription());
        centres.setZone(zone);
        return centresRepository.save(centres);
    }

    @Transactional
    public void deleteCentres(Long id) {

        Centres centre = centresRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Centre not found"));

        centresRepository.delete(centre);
    }

    public List<Centres> getCentresByZone(Long zoneId) {
        return centresRepository.findAll()
                .stream()
                .filter(c -> c.getZone().getId().equals(zoneId))
                .toList();
    }

    public Centres blockCentre(Long id) {

        Centres centre = centresRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Centre not found"));

        // toggle active
        centre.setActive(!centre.getActive());

        return centresRepository.save(centre);
    }
}
