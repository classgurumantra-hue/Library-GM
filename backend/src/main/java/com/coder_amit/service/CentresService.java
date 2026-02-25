package com.coder_amit.service;

import com.coder_amit.model.Centres;
import com.coder_amit.model.Zone;
import com.coder_amit.repository.CentresRepository;
import com.coder_amit.repository.ZoneRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CentresService {
    private final CentresRepository centresRepository;
    private  final ZoneRepository zoneRepository;

    public CentresService(CentresRepository centresRepository,ZoneRepository zoneRepository){
        this.centresRepository=centresRepository;
        this.zoneRepository=zoneRepository;
    }
    public Centres createCentres(Centres centres, Long zoneId){
        Zone zone = zoneRepository.findById(zoneId).orElseThrow(()-> new RuntimeException("Zone is not found"));
centres.setZone(zone);
return  centresRepository.save(centres);
    }
    public List<Centres>getAllCentres(){
        return  centresRepository.findAll();
    }
public Centres getCentresById(Long id){
        return  centresRepository.findById(id).orElseThrow(()->new RuntimeException("centres not found"));
}
public Centres updateCentres(Long id, Centres centresDetails, Long zoneId){
      Centres centres= getCentresById(id);
      Zone zone = zoneRepository.findById(zoneId).orElseThrow(()-> new RuntimeException("Zone not found"));
      centres .setCentreName(centresDetails.getCentreName());
      centres.setCapacity(centresDetails.getCapacity());
      centres.setAdmissionFee(centresDetails.getAdmissionFee());
      centres.setDescription(centresDetails.getDescription());
      centres.setZone(zone);
      return  centresRepository.save(centres);
}
public void  deleteCentres(Long id){
        centresRepository.deleteById(id);
}
}
