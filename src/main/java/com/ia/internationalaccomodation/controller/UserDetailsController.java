package com.ia.internationalaccomodation.controller;

import com.ia.internationalaccomodation.model.UserDetails;
import com.ia.internationalaccomodation.repositories.UserDetailsRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping(value = "/v1/userDetails")
public class UserDetailsController {
    private final UserDetailsRepository userDetailsRepository;

    public UserDetailsController(UserDetailsRepository userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    @GetMapping
    public List<UserDetails> getUserDetails () {
        return userDetailsRepository.findAll();
    }

    @GetMapping ("/{id}")
    public UserDetails getUserDetail (@PathVariable Long id) {
        return userDetailsRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping(value = "/createUser", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createUser(@RequestBody UserDetails userDetails) throws URISyntaxException {
        UserDetails userSaved = userDetailsRepository.save(userDetails);
        return ResponseEntity.created(new URI("/v1/userDetails/" + userSaved.getId())).body(userSaved);
    }

    @DeleteMapping
    public ResponseEntity deleteUser (@PathVariable Long id) {
        userDetailsRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
