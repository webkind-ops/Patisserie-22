import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-lavender-50 flex flex-col items-center justify-center px-4 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-soft-sm max-w-md w-full border border-lavender-100">
            <h1 className="font-serif text-3xl text-charcoal mb-4">Oops!</h1>
            <p className="text-charcoal-muted mb-8">
              Something went wrong while trying to display this page. We've been notified.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/';
              }}
              className="bg-lavender-600 hover:bg-lavender-700 text-white font-bold py-3 px-8 rounded-full transition-colors w-full"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
