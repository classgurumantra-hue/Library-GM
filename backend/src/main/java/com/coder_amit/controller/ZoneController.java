package com.coder_amit.controller;
import com.coder_amit.model.Zone;
import com.coder_amit.service.ZoneService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/zones")
public class ZoneController {
    private final ZoneService zoneService;

    public ZoneController(ZoneService zoneService) {
        this.zoneService = zoneService;
    }

    @PostMapping
    public Zone createZone(@RequestBody Zone zone) {
        return zoneService.createZone(zone);
    }

    @GetMapping
    public List<Zone> getAllZones() {
        return zoneService.getAllZones();
    }

    @GetMapping("/{id}")
    public Zone getZoneById(@PathVariable Long id) {
        return zoneService.getZoneById(id);
    }

    @PutMapping("/{id}")
    public Zone updateZone(@PathVariable Long id, @RequestBody Zone zoneDetails) {
        return zoneService.updateZone(id, zoneDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteZone(@PathVariable Long id) {
        zoneService.deleteZone(id);
    }
}
