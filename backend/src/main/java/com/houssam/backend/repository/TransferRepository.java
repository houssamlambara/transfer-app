package com.houssam.backend.repository;

import com.houssam.backend.entity.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransferRepository extends JpaRepository<Transfer, String> {

    List<Transfer> findAllByOrderByCreatedAtDesc();
}
