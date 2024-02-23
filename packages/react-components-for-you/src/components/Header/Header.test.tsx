import { render, screen } from '@testing-library/react';
import { Title } from '../Title/Title';

import { Header } from './Header';

describe('Header', () => {
  it('Renders without crashing ', () => {
    const testId = 'test-text';
    render(<Header data-testid={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('should display the provided child component', () => {
    const titleText = 'Test text';
    const childComponent = <Title>{titleText}</Title>;
    render(<Header>{childComponent}</Header>);
    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('should display the the default logo if no logo component is provided', () => {
    render(<Header />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should display the provided custom logo component', () => {
    const logoText = 'Test text';
    const logoComponent = <button type="button">{logoText}</button>;
    render(<Header customLogo={logoComponent} />);
    expect(screen.getByText(logoText)).toBeInTheDocument();
  });

  it('should add the provided url as the href attribute of the logo', () => {
    const logoLink = 'test/link';
    render(<Header logoUrl={logoLink} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', logoLink);
  });

  it('should add the base url as the href attribute of the logo if no url is provided', () => {
    render(<Header />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
