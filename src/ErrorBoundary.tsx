import React from 'react';

type ErrorHandler = (error: Error, errorInfo: React.ErrorInfo) => void

type ErrorBoundaryProps = {
    children: React.ReactNode
    fallback: React.ReactNode
    onError?: ErrorHandler
}

type withErrorBoundaryConfig = Omit<ErrorBoundaryProps, 'children'>

type ErrorBoundaryState = {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

export function withErrorBoundary<T>(config: withErrorBoundaryConfig) {
    return (Component: React.ComponentType<T>) => {
        const WithErrorBoundaryComponent = (props: T & JSX.IntrinsicAttributes) => (
            <ErrorBoundary {...config}>
                <Component {...props} />
            </ErrorBoundary>
        )
        WithErrorBoundaryComponent.displayName = `WithErrorBoundary(${Component.displayName || Component.name})`
        return WithErrorBoundaryComponent
    }

}