import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Diagram, Grommet, grommet, Stack, Text } from 'grommet';
import { Diamond } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';

import { data } from './data';

const customTheme = deepMerge(grommet, {
  diagram: {
    extend:
      '@keyframes example { to { stroke-dashoffset: 0; } } path { stroke-dasharray: 500; stroke-dashoffset: 500; animation: example 3s linear forwards; }',
  },
});

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  anchor: 'vertical',
  color: 'accent-4',
  thickness: 'xsmall',
  round: true,
  type: 'direct',
  ...rest,
});

const DiamondContainer = ({ carat, color, cut, align, id, name, textSize }) => (
  <Box
    align={align || 'center'}
    alignSelf="center"
    direction="row"
    gap="medium"
    key={id}
  >
    <Diamond id={id} size="xlarge" color="neutral-3" />
    <Box align={align}>
      <Text size="medium" weight="bold">
        {name}
      </Text>
      {carat && <Text size={textSize}> Carat: {carat} </Text>}
      {color && <Text size={textSize}> Color: {color} </Text>}
      {cut && <Text size={textSize}> Cut: {cut} </Text>}
    </Box>
  </Box>
);

const Container = ({ node, index }) => (
  <DiamondContainer
    carat={node.carat}
    color={node.color}
    cut={node.cut}
    id={index}
    key={node.name}
    name={node.name}
    textSize="small"
  />
);

class Animated extends React.Component {
  state = {
    draw: true,
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      const { draw } = this.state;
      this.setState({
        draw: !draw,
      });
    }, 3000);
  }

  render() {
    const { draw } = this.state;
    const connections = [];

    if (draw) {
      connections.push(connection('4', '1', { anchor: 'vertical' }));
      connections.push(connection('4', '2', { anchor: 'vertical' }));
      connections.push(connection('4', '3', { anchor: 'vertical' }));
    }

    return (
      <Grommet theme={customTheme}>
        <Box align="center">
          <Box pad="large">
            <Stack>
              <Box>
                <Box alignSelf="center" margin={{ bottom: 'large' }}>
                  <Container node={data[0]} index={1} />
                  <Box pad="small" />
                  <Box
                    id="4"
                    width="xsmall"
                    margin={{ bottom: 'large', top: 'xlarge' }}
                  />
                </Box>
                <Box direction="row" gap="xlarge">
                  {[2, 3].map(id => (
                    <Container node={data[id - 1]} index={id} />
                  ))}
                </Box>
              </Box>
              <Diagram connections={connections} />
            </Stack>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('Diagram', module).add('Animated', () => <Animated />);
