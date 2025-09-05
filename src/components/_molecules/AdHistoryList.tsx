import {AdHistory} from '@/lib/store/ad-history/type';
import useAdHistory from '@/lib/store/ad-history/useAdHistory';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Chip,
  Stack,
  styled,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import {useState} from 'react';
import dayjs from 'dayjs';

const StyledChip = styled(Chip)`
  width: fit-content;
  font-weight: 500;
`;

const AdHistoryList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const adHistory = useAdHistory((store) => store.adHistory);
  const resetAdHistory = useAdHistory((store) => store.reset);

  const getChipColor = (adCallType: AdHistory['adCallType']) => {
    if (adCallType === 'success') {
      return 'primary';
    } else if (adCallType === 'fail') {
      return 'error';
    } else if (adCallType === 'noAd') {
      return 'default';
    }
    return 'default';
  };

  return (
    <Stack spacing={2}>
      {adHistory.length > 0 && (
        <Stack direction="row" justifyContent="flex-end">
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={resetAdHistory}
          >
            Reset
          </Button>
        </Stack>
      )}
      {adHistory.map((item, index, array) => (
        <Card key={index} elevation={3}>
          <Accordion
            component="div"
            expanded={index === activeIndex}
            onChange={(event, newExpanded) =>
              setActiveIndex(newExpanded ? index : null)
            }
          >
            <AccordionSummary sx={{width: '100%'}}>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
              >
                <Typography>
                  {array.length - index}. {item.adOrder}
                </Typography>
                <StyledChip
                  label={item.adCallType}
                  variant="outlined"
                  size="small"
                  color={getChipColor(item.adCallType)}
                />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Paper elevation={1}>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Provider
                      </TableCell>
                      <TableCell>{item.provider}</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Timestamp
                      </TableCell>
                      <TableCell>
                        {dayjs(item.timestamp).format(
                          'YYYY-MM-DD HH:mm:ss.SSS',
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Config
                      </TableCell>
                      <TableCell>
                        {JSON.stringify(item.config, null, 2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Details
                      </TableCell>
                      <TableCell>
                        {JSON.stringify(item.details, null, 2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </Stack>
  );
};

export default AdHistoryList;
