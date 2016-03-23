package com.malexj.initializer;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

public class ApplicationInitializer implements WebApplicationInitializer {

    private final String DISPATCHER = "dispatcher";
    private final String MAPPING_URL = "/*";
    private final String CONFIG_LOCATION = "com.malexj.config";

    private AnnotationConfigWebApplicationContext getContext() {
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.setConfigLocation(CONFIG_LOCATION);
        return ctx;
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

        WebApplicationContext context = getContext();
        servletContext.addListener(new ContextLoaderListener(context));

        ServletRegistration.Dynamic servletRegistration = servletContext.addServlet(DISPATCHER, new DispatcherServlet(context));
        servletRegistration.addMapping(MAPPING_URL);
        servletRegistration.setLoadOnStartup(1);
    }
}
