package com.coder_amit.controller;

import com.coder_amit.model.Centres;
import com.coder_amit.service.CentresService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/centres")
public class CentresController {
    private final CentresService centresService;

    public CentresController(CentresService centresService) {
        this.centresService = centresService;
    }

    @PostMapping("/{zoneId}")
    public Centres createCentres(@RequestBody Centres centres, @PathVariable Long zoneId) {
        return centresService.createCentres(centres, zoneId);
    }

    @GetMapping
    public List<Centres> getAllCentres() {
        return centresService.getAllCentres();
    }

    @GetMapping("/{id}")
    public Centres getCentresById(@PathVariable Long id) {
        return centresService.getCentresById(id);
    }

    @PutMapping("/{id}/{zoneId}")
    public Centres updateCentres(@PathVariable Long id, @RequestBody Centres centresDetails,
            @PathVariable Long zoneId) {
        return centresService.updateCentres(id, centresDetails, zoneId);
    }

    @DeleteMapping("/{id}")
    public void deleteCentres(@PathVariable Long id) {
        centresService.deleteCentres(id);
    }

    @GetMapping("/zone/{zoneId}")
    public List<Centres> getCentresByZone(@PathVariable Long zoneId) {
        return centresService.getCentresByZone(zoneId);
    }

    @PutMapping("/block/{id}")
    public Centres blockCentre(@PathVariable Long id) {
        return centresService.blockCentre(id);
    }

}
