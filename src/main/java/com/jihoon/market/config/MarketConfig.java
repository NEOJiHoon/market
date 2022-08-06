package com.jihoon.market.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration
public class MarketConfig {
    @Bean
    ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

}
