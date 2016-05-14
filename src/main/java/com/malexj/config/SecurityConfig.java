package com.malexj.config;

import com.malexj.component.AuthFailure;
import com.malexj.component.AuthSuccess;
import com.malexj.component.EntryPointUnauthorizedHandler;
import com.malexj.component.users.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@ComponentScan("com.malexj")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthFailure failure;

    @Autowired
    private AuthSuccess success;

    @Autowired
    private EntryPointUnauthorizedHandler handler;

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Autowired
    public void configureAuthBuilder(AuthenticationManagerBuilder builder) throws Exception {
        builder.userDetailsService(userDetailService);

//        builder
//                .inMemoryAuthentication()
//                .withUser("admin")
//                .password("1111")
//                .roles("USER");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(handler)
                .and()
                .formLogin()
                .successHandler(success)
                .failureHandler(failure)
                .and()
                .authorizeRequests()
                .antMatchers("/**")
                .permitAll();
    }
}
