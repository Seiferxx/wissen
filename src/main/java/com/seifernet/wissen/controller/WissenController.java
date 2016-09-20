package com.seifernet.wissen.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.seifernet.wissen.util.ModelAttributes;
import com.seifernet.wissen.util.WebResources;

/**
 * Application controller
 * 
 * @author Seifer( Cuauhtemoc Herrera )
 * @version 0.0.1
 *
 */
@Controller
public class WissenController {
	
	/**
	 * Index page
	 * 
	 * @param auth User authentication
	 * @return String template name
	 */
	@RequestMapping( "/" )
	public String index( Model model, Authentication auth ){
		
		model.addAttribute( ModelAttributes.HEADER_SOURCE, "headers" );
		model.addAttribute( ModelAttributes.HEADER_FRAGMENT, "indexHeader" );
		model.addAttribute( ModelAttributes.MENU_SOURCE, "menus" );
		
		if( auth != null && auth.isAuthenticated( ) ){
			model.addAttribute( ModelAttributes.MENU_FRAGMENT, "topMenuUser" );
			model.addAttribute( ModelAttributes.USER_NICKNAME, ( ( User )auth.getPrincipal() ).getUsername( ) );
		} else {
			model.addAttribute( ModelAttributes.MENU_FRAGMENT, "topMenuAnonymous" );
		}
		return WebResources.BASE_LAYOUT;
	}
	
	@RequestMapping( "/login" )
	public String loginPage( Authentication auth ){
		if( auth != null && auth.isAuthenticated( ) ){
			return "redirect:/";
		}
		return "login";
	}
	@RequestMapping( "/flashcardslist" )
	public String flashcard( ){
		return "flashcard_list_no_style";
	}
}
