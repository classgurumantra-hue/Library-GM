package com.coder_amit.service;
import com.coder_amit.model.Zone;
import com.coder_amit.repository.ZoneRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ZoneService {
    private final ZoneRepository zoneRepository;

    public ZoneService(ZoneRepository zoneRepository) {
        this.zoneRepository = zoneRepository;
    }

    public Zone createZone(Zone zone) {
        return zoneRepository.save(zone);
    }

    public List<Zone> getAllZones() {
        return zoneRepository.findAll();
    }

    public Zone getZoneById(Long id) {
        return zoneRepository.findById(id).orElseThrow(() -> new RuntimeException("Zone not found"));
    }

    public Zone updateZone(Long id, Zone zoneDetails) {
        Zone zone = getZoneById(id);
        zone.setZoneName(zoneDetails.getZoneName());
        zone.setStateName(zoneDetails.getStateName());
        zone.setDescription(zoneDetails.getDescription());
        return zoneRepository.save(zone);
    }

    public void deleteZone(Long id) {
        zoneRepository.deleteById(id);
    }
}
