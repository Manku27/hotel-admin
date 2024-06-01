export const employeesAsOptions = (employeeList) => {
  return employeeList?.map((user) => {
    return {
      id: user.id,
      label: `${user.firstName} ${user.lastName}`,
    };
  });
};
