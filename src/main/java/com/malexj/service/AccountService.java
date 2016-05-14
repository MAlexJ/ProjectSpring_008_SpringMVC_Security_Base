package com.malexj.service;


import com.malexj.entity.Account;

public interface AccountService {

    Account findByAccountName(String name);
}
