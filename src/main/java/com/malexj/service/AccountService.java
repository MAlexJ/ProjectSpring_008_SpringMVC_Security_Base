package com.malexj.service;


import com.malexj.entity.AccountEntity;

public interface AccountService {

    AccountEntity findByAccountName(String name);
}
