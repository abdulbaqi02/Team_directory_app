/**
 * Team Directory Application Configuration
 * Configures REST services and application settings
 */
component {
    // Application settings
    this.name = "TeamDirectoryApp";
    this.applicationTimeout = createTimeSpan(0, 2, 0, 0);
    this.sessionManagement = true;
    this.sessionTimeout = createTimeSpan(0, 0, 30, 0);
    
    // REST service configuration
    this.restSettings = {
        cfclocation: ".",
        skipCFCWithError: true
    };
    
    // Database datasource configuration for SQLite
    this.datasources = {
        "TeamDirectory": {
            class: "org.sqlite.JDBC",
            connectionString: "jdbc:sqlite:#expandPath('./database/employees.db')#"
        }
    };
    
    // Set default datasource
    this.datasource = "TeamDirectory";
    
    /**
     * Application initialization
     */
    public boolean function onApplicationStart() {
        return true;
    }
    
    /**
     * Request initialization - Add CORS headers globally
     */
    public boolean function onRequestStart(string targetPage) {
        // Enable CORS for all requests
        header name="Access-Control-Allow-Origin" value="*";
        header name="Access-Control-Allow-Methods" value="GET, POST, PUT, DELETE, OPTIONS";
        header name="Access-Control-Allow-Headers" value="Content-Type, Authorization, X-Requested-With";
        
        // Handle preflight OPTIONS requests
        if (cgi.request_method == "OPTIONS") {
            header statuscode="200" statustext="OK";
            abort;
        }
        
        return true;
    }
    
    /**
     * Error handling
     */
    public void function onError(required any exception, required string eventName) {
        writeLog(
            type="error",
            file="TeamDirectory",
            text="Error in #arguments.eventName#: #arguments.exception.message#"
        );
    }
}
