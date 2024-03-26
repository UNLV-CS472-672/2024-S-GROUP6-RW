import { render } from '@testing-library/react';
import GettingStartedBanner from '../components/GettingStarted/GettingStartedBanner';

describe('GettingStartedBanner', () => {
  it('renders properly', () => {
    const props = {
      cName: 'test-class',
      BannerBackground: 'test.jpg',
      textSection: 'text-section',
      title: 'Test Title',
      text: 'Test Text',
      text1: 'Test Text 1',
      url: 'https://test.com',
      buttonClass: 'button-class',
      buttonText: 'Click Me',
      directions: 'directions',
      directionText: 'direction-text',
    };

    const { getByText, getByRole } = render(<GettingStartedBanner {...props} />);

    expect(getByText(props.title)).toBeInTheDocument();
    expect(getByText(props.text)).toBeInTheDocument();
    expect(getByText(props.text1)).toBeInTheDocument();
    expect(getByRole('link', { name: props.buttonText })).toHaveAttribute('href', props.url);
  });
});