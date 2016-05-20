package com.malexj.controller;

import com.malexj.entity.CommentEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping(path = "/")
public class CommentController {

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/comment", method = RequestMethod.POST)
    public void register_POST(@RequestBody CommentEntity entity){

        //TODO validate field notNull && " "
        System.err.println(entity);
    }

}
