
export class UserDetails {
  username: string;
  firstName: string;
  lastName: string;
  authorities: string[];
  joinings: Joining[];
  permissions: string[];
}

export class Joining {
  subsidiary: string;
  interv: string;
  joiningType: string;
  source: string;
}

export const UserDetailsFormatizer = (userDetail: any) => {
  const userDetailsFormatizer: UserDetails = new UserDetails;

  if (!userDetail ||
    !userDetail.hasOwnProperty('username') ||
    !userDetail.hasOwnProperty('firstName') ||
    !userDetail.hasOwnProperty('lastName') ||
    // tslint:disable-next-line:max-line-length
    userDetail.username === null || userDetail.username === undefined || typeof userDetail.username === 'object' || typeof userDetail.username === 'boolean' ||
    // tslint:disable-next-line:max-line-length
    userDetail.firstName === null || userDetail.firstName === undefined || typeof userDetail.firstName === 'object' || typeof userDetail.firstName === 'boolean' ||
    // tslint:disable-next-line:max-line-length
    userDetail.lastName === null || userDetail.lastName === undefined || typeof userDetail.lastName === 'object' || typeof userDetail.lastName === 'boolean'
  ) { userDetail = { username: 'SERVER ERROR', firstName: 'SERVER ERROR', lastName: 'SERVER ERROR' }; }

  if (typeof userDetail.username === 'number') { userDetail.username = userDetail.username.toString(); }
  if (typeof userDetail.firstName === 'number') { userDetail.firstName = userDetail.firstName.toString(); }
  if (typeof userDetail.lastName === 'number') { userDetail.lastName = userDetail.lastName.toString(); }

  Object.assign(userDetailsFormatizer, userDetail);
  return userDetailsFormatizer;
};
