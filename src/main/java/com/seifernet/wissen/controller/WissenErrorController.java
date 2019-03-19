package com.seifernet.wissen.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WissenErrorController implements ErrorController {

	private static final Logger logger = LoggerFactory.getLogger(WissenErrorController.class);
	
	@RequestMapping("/error")
    public String handleError(HttpServletRequest request) {
		Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

		logger.info(status.toString());
        return "error";
    }
	
	@Override
	public String getErrorPath() {
		return "/error";
	}

}
