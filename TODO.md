# Employee management
- []    Add New Employee
  - []    Verify that a new employee can be added with valid information.
  - []    Ensure proper validation for mandatory fields.
  - []    Check for error handling with invalid input.
- []    List Employees
  - []    Confirm that the employee list displays all added employees.
  - []    Validate the accuracy of displayed employee information.
  - []    Check for pagination if applicable.
- []    Edit Employe
  - []    Basic info
    - []    Confirm that the employee has been updated
    - []    Validate that the data shown on dialog is correct.
    - []    Should not edit the email to an already existing one.
  - []    Edit address
    - []    Validate that the data shown in dialogs is correct.
    - []    Confirm that the employee has been updated.
    - []    The zip code should be only 5 digits.
  - []    Edit contract
    - []    Should not update hiring date
    - []    Confirm that the employee has been updated
    - []    Promote Employees
    - []    Confirm that the employee has been promoted.
    - []    Confirm that the employee can be demoted.
  - []    Add to a team
    - []    Confirm that the employee has been added to a team.
    - []    Should show the current team of the employee.
  - []    Delete an employee
    - []    Confirm that the employee is correctly deleted.
    - []    Validate that the team they was in is correctly updated.

# Team Management

- [x] 	Create Team
  - [x] 	Verify that a new team can be created.
  - [] 	Check for proper handling of team name validation.
  - [x] 	Ensure teams are unique.
- [] 	Add Employee to Team
  - [] 	Confirm that an employee can be added to a team.
  - [] 	Validate the employee's association with the correct team.
  - [] 	Check for proper handling when adding an employee to multiple teams.
- [x] 	List All Teams
  - [x] 	Verify that all created teams are listed.
  - [x] 	Check for accurate display of team information.
  - [x] 	Validate pagination if applicable.
- [x] 	Delete a Team
  - [x] 	Verify that the team is correctly deleted.
  - [] 	Verify the team members have no team after team deletion.
  - [] 	Validate pagination if applicable.

# Database management

- []	Reset Database
  - []	Confirm that the database can be reset.
  - []	Validate that all data is cleared and reset to the initial state.
