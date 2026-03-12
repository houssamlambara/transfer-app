package com.houssam.backend;

import com.houssam.backend.entity.User;
import com.houssam.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner start(UserRepository userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(User.builder()
                        .fullName("Houssam Lambaraa")
                        .email("houssam@gmail.com")
                        .balance(5000.00)
                        .build());

                userRepository.save(User.builder()
                        .fullName("Recruteur Test")
                        .email("recruteur@entreprise.com")
                        .balance(100.00)
                        .build());

                System.out.println("Utilisateurs de test créés avec succès en base H2");
            }
        };
    }
}
