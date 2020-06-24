import rules from "../rbac-rules";


const check = (rules, role, action, data) => {
    const permissions = rules[role];
    if (!permissions) {
        // role is not present in the rules file 
        // meaning all permissions are false
        return false;
    }

    const staticPermissions = permissions.static;

    if (staticPermissions && staticPermissions.includes(action)) {
        // action is permitted according to rules static object

        return true;
    }

    const dynamicPermissions = permissions.dynamic;

    // first check if the dynamic permission exists
    if (dynamicPermissions) {
        // condition exists to now  set the value of permissionCondition to the value from the object
        const permissionCondition = dynamicPermissions[action];

        if (!permissionCondition) {
            // dynamic rule not provided for in action. 
            // the rule was not explicitly allowed in the rules file 
            // so permission is false
            return false;
        }
        return permissionCondition(data);
    }
    // finally return false if none of the other conditionals were enacted
    // this prevents a fal positive and/or errors when returning the Can props
    return false;
};

// set Can value using the check value with a ternery operator
const Can = (props) =>
    check(rules, props.role, props.perform, props.data)
        ? props.yes() // props value if true
        : props.no(); // props value if false 

Can.defaultProps = {
    yes: () => null,
    no: () => null
};

export default Can;