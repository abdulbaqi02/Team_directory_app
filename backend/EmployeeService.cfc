/**
 * Employee Service - RESTful API Component
 * Provides REST endpoints for employee data management
 * 
 * @RestPath /api/employees
 */
component rest="true" restpath="/api/employees" {
    
    /**
     * Get all employees from the database
     * 
     * @RestMethod GET
     * @RestPath /
     * @Produces application/json
     * @return Array of employee objects
     */
    remote array function getEmployees() 
        httpmethod="GET" 
        restpath="" 
        produces="application/json" {
        
        var result = [];
        
        try {
            // Query database with security best practices
            var qEmployees = queryExecute(
                "SELECT ID, FirstName, LastName, Role, CreatedAt 
                 FROM Employees 
                 ORDER BY LastName, FirstName",
                {},
                {
                    datasource: "TeamDirectory"
                }
            );
            
            // Convert query to array of structs for JSON serialization
            for (var row in qEmployees) {
                arrayAppend(result, {
                    "id": row.ID,
                    "firstName": row.FirstName,
                    "lastName": row.LastName,
                    "role": row.Role,
                    "createdAt": dateFormat(row.CreatedAt, "yyyy-mm-dd")
                });
            }
            
            // Set response headers
            restSetResponse({
                status: 200,
                content: result
            });
            
        } catch (any e) {
            // Log error for debugging
            writeLog(
                type="error",
                file="EmployeeService",
                text="Error fetching employees: #e.message# - #e.detail#"
            );
            
            // Return error response
            restSetResponse({
                status: 500,
                content: {
                    "error": true,
                    "message": "Failed to retrieve employees",
                    "detail": e.message
                }
            });
        }
        
        return result;
    }
    
    /**
     * Get employee by ID
     * 
     * @RestMethod GET
     * @RestPath /{id}
     * @Produces application/json
     * @param id Employee ID
     * @return Employee object
     */
    remote struct function getEmployeeById(required numeric id) 
        httpmethod="GET" 
        restpath="/{id}" 
        produces="application/json" {
        
        var result = {};
        
        try {
            // Query with cfqueryparam for SQL injection prevention
            var qEmployee = queryExecute(
                "SELECT ID, FirstName, LastName, Role, CreatedAt 
                 FROM Employees 
                 WHERE ID = :id",
                {
                    id: {value: arguments.id, cfsqltype: "cf_sql_integer"}
                },
                {
                    datasource: "TeamDirectory"
                }
            );
            
            if (qEmployee.recordCount > 0) {
                result = {
                    "id": qEmployee.ID,
                    "firstName": qEmployee.FirstName,
                    "lastName": qEmployee.LastName,
                    "role": qEmployee.Role,
                    "createdAt": dateFormat(qEmployee.CreatedAt, "yyyy-mm-dd")
                };
                
                restSetResponse({
                    status: 200,
                    content: result
                });
            } else {
                restSetResponse({
                    status: 404,
                    content: {
                        "error": true,
                        "message": "Employee not found"
                    }
                });
            }
            
        } catch (any e) {
            writeLog(
                type="error",
                file="EmployeeService",
                text="Error fetching employee #arguments.id#: #e.message#"
            );
            
            restSetResponse({
                status: 500,
                content: {
                    "error": true,
                    "message": "Failed to retrieve employee",
                    "detail": e.message
                }
            });
        }
        
        return result;
    }
    
    /**
     * Search employees by name
     * 
     * @RestMethod GET
     * @RestPath /search
     * @Produces application/json
     * @param query Search query string
     * @return Array of matching employee objects
     */
    remote array function searchEmployees(string query = "") 
        httpmethod="GET" 
        restpath="/search" 
        produces="application/json" {
        
        var result = [];
        
        try {
            var searchTerm = "%" & arguments.query & "%";
            
            // Search with parameterized query for security
            var qEmployees = queryExecute(
                "SELECT ID, FirstName, LastName, Role, CreatedAt 
                 FROM Employees 
                 WHERE FirstName LIKE :searchTerm 
                    OR LastName LIKE :searchTerm 
                    OR Role LIKE :searchTerm
                 ORDER BY LastName, FirstName",
                {
                    searchTerm: {value: searchTerm, cfsqltype: "cf_sql_varchar"}
                },
                {
                    datasource: "TeamDirectory"
                }
            );
            
            for (var row in qEmployees) {
                arrayAppend(result, {
                    "id": row.ID,
                    "firstName": row.FirstName,
                    "lastName": row.LastName,
                    "role": row.Role,
                    "createdAt": dateFormat(row.CreatedAt, "yyyy-mm-dd")
                });
            }
            
            restSetResponse({
                status: 200,
                content: result
            });
            
        } catch (any e) {
            writeLog(
                type="error",
                file="EmployeeService",
                text="Error searching employees: #e.message#"
            );
            
            restSetResponse({
                status: 500,
                content: {
                    "error": true,
                    "message": "Failed to search employees",
                    "detail": e.message
                }
            });
        }
        
        return result;
    }
}
