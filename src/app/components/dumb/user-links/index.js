'use strict';

function UserLinksDirective () {
	let directive = {
		restrict: 'E',
		controller: UserLinks,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			logout: '&',
			loggedIn: '='
		},
		templateUrl: 'app/components/dumb/user-links/view.html',
	};

	return directive;
}

class UserLinks {

}

export default UserLinksDirective;