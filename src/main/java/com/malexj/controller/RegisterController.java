package com.malexj.controller;

import com.malexj.entity.AccountEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/")
public class RegisterController {

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public void register_POST(@RequestBody AccountEntity account){

        //TODO validate field notNull && " "
        System.err.println(account);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/restore", method = RequestMethod.POST)
    public void restore_POST(@RequestBody AccountEntity account){

        //TODO validate field notNull && " "
        System.err.println(account);
    }

}
