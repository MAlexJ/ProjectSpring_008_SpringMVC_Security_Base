package com.malexj.service.impl;

import com.malexj.entity.AccountEntity;
import com.malexj.entity.Roles;
import com.malexj.service.AccountService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    private static List<AccountEntity> accountList;

    static {
        accountList = new ArrayList<>();

        AccountEntity admin = new AccountEntity();
        admin.setId(1L);
        admin.setName("admin");
        admin.setPassword("1111");
        admin.setRole(Roles.ROLE_ADMIN);
        accountList.add(admin);

        AccountEntity user = new AccountEntity();
        user.setId(2L);
        user.setName("user");
        user.setPassword("1111");
        user.setRole(Roles.ROLE_USER);
        accountList.add(user);

    }

    @Override
    public AccountEntity findByAccountName(String name) {
        AccountEntity account = new AccountEntity();
        account.setId(1L);
        account.setName("admin");
        account.setPassword("1111");
        return account;
    }
}
