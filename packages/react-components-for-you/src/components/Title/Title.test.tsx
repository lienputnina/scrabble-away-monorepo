import { render, screen } from '@testing-library/react';
import { Title, TitleLevel, TitleAlignment } from './Title';

describe('Title', () => {
  it('should render without crashing', () => {
    const testId = 'test-title';
    render(<Title data-testid={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('should display the provided text', () => {
    const providedText = 'Test text';
    render(<Title>{providedText}</Title>);
    expect(screen.getByText(providedText)).toBeInTheDocument();
  });

  describe('Heading levels', () => {
    Object.entries(TitleLevel).forEach(([levelName, levelValue]) => {
      it(`should match the provided heading level ${levelName}`, () => {
        const { container } = render(<Title level={levelValue} />);
        expect(
          container.getElementsByTagName(levelValue)[0],
        ).toBeInTheDocument();
      });
    });
  });

  describe('Heading alignments', () => {
    Object.entries(TitleAlignment).forEach(
      ([alignmentName, alignmentValue]) => {
        it(`should match the provided heading alignment ${alignmentName}`, () => {
          const { container } = render(<Title alignment={alignmentValue} />);
          expect(
            container.getElementsByClassName(alignmentValue)[0],
          ).toBeInTheDocument();
        });
      },
    );
  });
});
