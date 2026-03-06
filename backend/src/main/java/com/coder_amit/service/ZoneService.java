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
        return zoneRepository.findAll()
                .stream()
                .filter(zone -> !zone.getDeleted())
                .toList();
    }

    public Zone getZoneById(Long id) {
        return zoneRepository.findById(id).orElseThrow(() -> new RuntimeException("Zone not found"));
    }

    public Zone updateZone(Long id, Zone zoneDetails) {
        Zone zone = getZoneById(id);
        zone.setZoneName(zoneDetails.getZoneName());
        zone.setStateName(zoneDetails.getStateName());
        zone.setDescription(zoneDetails.getDescription());
        zone.setActive(zoneDetails.getActive());
        zone.setDeleted(zoneDetails.getDeleted());

        return zoneRepository.save(zone);
    }

    public void deleteZone(Long id) {

        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        if (zone.getCentres() != null && !zone.getCentres().isEmpty()) {
            throw new RuntimeException("Cannot delete zone. Centres exist in this zone.");
        }

        zoneRepository.delete(zone);
    }

    public Zone toggleZoneStatus(Long id) {

        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        zone.setActive(!zone.getActive());

        return zoneRepository.save(zone);
    }
}
