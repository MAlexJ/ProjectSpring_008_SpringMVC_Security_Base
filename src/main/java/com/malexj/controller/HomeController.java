package com.malexj.controller;

import com.malexj.entity.Account;
import com.malexj.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @Autowired
    private AccountService accountService;

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String home(){
        return "index";
    }

    @RequestMapping(path = "/aut", method = RequestMethod.GET)
    public String home_aut(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetails) {
            UserDetails details = (UserDetails) principal;

        Account loggedIn = accountService.findByAccountName(details.getUsername());
            System.err.println(loggedIn.getName());
            return "login";
        }
        return "index";
    }

}
