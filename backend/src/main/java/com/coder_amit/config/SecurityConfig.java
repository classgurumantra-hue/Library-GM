package com.coder_amit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

//import org.springframework.security.web.SecurityFilterChain;
//
//@EnableWebSecurity
//public class SecurityConfig {
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf().disable()
//                .authorizeHttpRequests()
//                .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                .requestMatchers("/api/subadmin/**").hasAnyRole("ADMIN","SUB_ADMIN")
//                .requestMatchers("/api/coadmin/**").hasAnyRole("ADMIN","SUB_ADMIN","CO_ADMIN")
//                .requestMatchers("/api/vendor/**").hasAnyRole("ADMIN","SUB_ADMIN","CO_ADMIN","VENDOR")
//                .anyRequest().authenticated()
//                .and()
//                .httpBasic();
//        return http.build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/subadmin/**").hasAnyRole("ADMIN", "SUB_ADMIN")
                        .requestMatchers("/api/coadmin/**").hasAnyRole("ADMIN", "SUB_ADMIN", "CO_ADMIN")
                        .requestMatchers("/api/vendor/**").hasAnyRole("ADMIN", "SUB_ADMIN", "CO_ADMIN", "VENDOR")
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
