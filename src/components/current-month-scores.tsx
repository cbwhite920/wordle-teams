import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import AppContext from '@/lib/app-context'
import { useContext } from 'react'

const CurrentMonthScores = () => {
  const { selectedTeam, selectedMonth } = useContext(AppContext)
  const sorted = !!selectedTeam.players
    ? selectedTeam.players.sort(
        (a, b) =>
          a.aggregateScoreByMonth(
            selectedMonth.toISOString(),
            selectedTeam.playWeekends,
            selectedTeam.scoringSystem
          ) +
          b.aggregateScoreByMonth(
            selectedMonth.toISOString(),
            selectedTeam.playWeekends,
            selectedTeam.scoringSystem
          )
      )
    : []

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>Current Month</CardTitle>
        <CardDescription>Total scores by player for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col space-y-2'>
          {sorted.map((player) => (
            <li key={player.fullName} className='flex justify-between'>
              <div>{player.fullName}</div>
              <div>
                {player.aggregateScoreByMonth(
                  selectedMonth.toISOString(),
                  selectedTeam?.playWeekends,
                  selectedTeam.scoringSystem
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default CurrentMonthScores
