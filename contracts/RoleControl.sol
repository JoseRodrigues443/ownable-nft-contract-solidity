// SPDX-License-Identifier: GPL3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";


/**
 * @title RoleControl
 * @author Jose Miguel Rodrigues
 * @dev Implements Admin and User roles.
 */
contract RoleControl is AccessControl {

    bytes32 public constant USER_ROLE = keccak256("USER"); // hash a USER as a role constant

    /**
     * @dev Add `root` to the admin role as a member.
     */
    constructor (address root) {
        _setupRole(DEFAULT_ADMIN_ROLE, root);
        _setRoleAdmin(USER_ROLE, DEFAULT_ADMIN_ROLE);
    }

    /// @dev Restricted to members of the admin role.
    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Restricted to admins.");
        _;
    }

    /// @dev Restricted to members of the user role.
    modifier onlyUser() {
        require(isUser(msg.sender), "Restricted to user.");
        _;
    }
    
    /// @dev Restricted to members of the user role.
    // modifier onlyUserOrAdmin() {
    //     require(isUser(msg.sender), "Restricted to admins.");
    //     _;
    // }

    /**
     * @dev A method to verify if the account belongs to the admin role
     * @param account The address to verify.
     * @return Return `true` if the account belongs to the admin role.
     */
    function isAdmin(address account)
        public
        virtual
        view
        returns(bool)
    {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * @dev A method to verify if the account belongs to the user role
     * @param account The address to verify.
     * @return Return `true` if the account belongs to the user role.
     */
    function isUser(address account)
        public
        virtual
        view
        returns(bool)
    {
        return hasRole(USER_ROLE, account);
    }

    /**
     * @dev Add an account to the user role. Restricted to admins.
     * @param account The member to add as a member.
     */
    function addUser(address account)
        public
        virtual
        onlyAdmin
    {
        grantRole(USER_ROLE, account);
    }

    /**
     * @dev Add an account to the admin role. Restricted to admins.
     * @param account The member to add as a admin.
     */
    function addAdmin(address account)
        public
        virtual
        onlyAdmin
    {
        grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * @dev Remove an account from the user role. Restricted to admins.
     * @param account The member to remove.
     */
    function removeUser(address account)
        public
        virtual
        onlyAdmin
    {
        revokeRole(USER_ROLE, account);
    }

    /**
     * @dev Remove oneself from the admin role.
     */
    function renounceAdmin()
        public virtual
    {
        renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

}