import React, { Component } from 'react';

/**
 * -----------------------------------------------------------------
 * @component SSAuthRoute
 * @description
 * Act as a fallback if application has issue or is there any runtime error.
 * -----------------------------------------------------------------
 */
class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        if (this.state.hasError) {
            const { error, errorInfo } = this.state;
            return (
                <div className=''>
                    <h1>Something went wrong.</h1>
                    <p>{error?.toString()}</p>
                    <pre>{errorInfo?.componentStack}</pre>
                    <button className="btn ss-btn" onClick={() => window.location.reload()}>Show feeds</button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundry;