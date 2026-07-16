import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-dark">
            Não foi possível carregar a programação. Recarregue a página.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
