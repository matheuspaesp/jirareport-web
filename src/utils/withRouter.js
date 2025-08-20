import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = (Component) => {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        // Estrutura compatível com React Router v5
        const match = {
            params: params,
            isExact: true,
            path: location.pathname,
            url: location.pathname
        };

        const history = {
            push: navigate,
            navigate: navigate,
            replace: (path) => navigate(path, { replace: true }),
            go: (n) => navigate(n),
            goBack: () => navigate(-1),
            goForward: () => navigate(1),
            block: () => {},
            listen: () => {}
        };

        return (
            <Component
                {...props}
                location={location}
                history={history}
                match={match}
                params={params}
            />
        );
    };
};

export default withRouter;
