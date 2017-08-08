require 'pry'

class Testcode
  def initialize
    @board = [
      ["x","-","-"],
      ["-","o","-"],
      ["x","-","-"]
    ]
  end

  def win(symbo)
    diagnoal_count = [0,0]
    size = @board[0].length
    i = 0
    while i < size
      hor_count = 0
      ver_count = 0
      n = 0
      while n < size
        # puts "this is the N loop: N = #{n}, cord = [#{i}, #{n}] symbo = #{@board[i][n]}"
        (hor_count += 1) if symbo == @board[i][n]
        (ver_count += 1) if symbo == @board[n][i]
        if (i == n )
          # puts "When i == n: cord = [#{i}, #{n}] symbo = #{@board[i][n]}"
          (diagnoal_count[0] += 1) if symbo == @board[i][n]
        end
        if ( i == size - 1 - n )
          # puts "cord = [#{i}, #{n}] symbo = #{@board[i][n]}"
          (diagnoal_count[1] += 1) if symbo == @board[i][n]
        end
        return true if  (hor_count == size || ver_count == size || diagnoal_count[0] == size || diagnoal_count[0] == size)
        n += 1
      end
      i += 1
    end
  end

end
hello = Testcode.new
p hello.win('x')
