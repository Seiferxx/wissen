package com.seifernet.wissen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

/**`
 * Spring boot main class and annotation configuration
 * 
 * @author Seiferson (Cuauhtemoc Herrera)
 */
@Configuration
@ComponentScan
@EnableAutoConfiguration
@EnableScheduling
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SpringBoot {

	/**
	 * Main method
	 * 
	 * @param args Console arguments
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		SpringApplication.run( SpringBoot.class );
	}
}
