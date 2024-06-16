package com.ia.internationalaccomodation.repositories;

import com.ia.internationalaccomodation.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
}
