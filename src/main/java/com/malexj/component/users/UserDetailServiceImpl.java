package com.malexj.component.users;

import com.malexj.entity.AccountEntity;
import com.malexj.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private AccountService service;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AccountEntity account =service.findByAccountName(username);
        if(account == null) {
            throw new UsernameNotFoundException("no user found with " + username);
        }

        return new AccountUserDetails(account);
    }
}
