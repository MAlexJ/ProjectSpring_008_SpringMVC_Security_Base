package com.malexj.service.impl;

import com.malexj.entity.Account;
import com.malexj.service.AccountService;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Override
    public Account findByAccountName(String name) {
        Account account = new Account();
        account.setId(1L);
        account.setName("admin");
        account.setPassword("1111");
        return account;
    }
}
