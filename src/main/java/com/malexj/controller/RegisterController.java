package com.malexj.controller;

import com.malexj.entity.Account;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/")
public class RegisterController {

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public void home(@RequestBody Account account){
        System.err.println(account);
    }

}
